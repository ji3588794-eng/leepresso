"use client";
import React, { useRef, useEffect } from "react";

interface BlobInstance {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  sinValue: number;
  update: (width: number, height: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const FluidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let blobs: BlobInstance[] = [];
    const colors = [
      "rgba(249, 245, 240, 1)",
      "rgba(232, 213, 196, 0.6)",
      "rgba(184, 104, 69, 0.2)",
      "rgba(255, 255, 255, 0.7)",
    ];

    const createBlob = (w: number, h: number): BlobInstance => {
      const radius = Math.random() * (w * 0.5) + w * 0.2;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        sinValue: Math.random() * Math.PI * 2,
        update(width: number, height: number) {
          this.x += this.vx;
          this.y += this.vy;
          this.sinValue += 0.01;
          const currentRadius = this.radius + Math.sin(this.sinValue) * 50;

          if (this.x < -currentRadius) this.x = width + currentRadius;
          if (this.x > width + currentRadius) this.x = -currentRadius;
          if (this.y < -currentRadius) this.y = height + currentRadius;
          if (this.y > height + currentRadius) this.y = -currentRadius;
        },
        draw(context: CanvasRenderingContext2D) {
          const currentRadius = this.radius + Math.sin(this.sinValue) * 50;
          const gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentRadius);
          gradient.addColorStop(0, this.color);
          gradient.addColorStop(1, "rgba(249, 245, 240, 0)");

          context.beginPath();
          context.fillStyle = gradient;
          context.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
          context.fill();
        },
      };
    };

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      blobs = Array.from({ length: 6 }, () => createBlob(canvas.width, canvas.height));
    };

    const animate = () => {
      ctx.fillStyle = "#f9f5f0";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "multiply";
      blobs.forEach((blob) => {
        blob.update(canvas.width, canvas.height);
        blob.draw(ctx);
      });
      ctx.globalCompositeOperation = "source-over";

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);
    init();
    animate();

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default FluidBackground;