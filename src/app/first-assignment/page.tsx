'use client'

import { useRef, useState, useEffect } from "react";

type Shape = "rectangle" | "circle";

const FirstAssignmentPage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [shape, setShape] = useState<Shape>("rectangle");
    const [borderRadius, setBorderRadius] = useState(0);
    const [color, setColor] = useState("#000000");
    const [stroke, setStroke] = useState("#000000");

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clearing canvas
            ctx.fillStyle = color;
            ctx.strokeStyle = stroke;
    
            if (shape === "rectangle") {
                ctx.beginPath();
                ctx.roundRect(75, 125, 200, 100, borderRadius);
                ctx.fill();
                ctx.stroke();
            } else if (shape === "circle") {
                ctx.beginPath();
                ctx.arc(150, 150, 75, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }
        }

    }, [shape, borderRadius, color, stroke]);

    return (
        <main className="flex flex-col items-center justify-center h-screen p-8">
            <div className="w-96">
                <canvas ref={canvasRef} height={300} width={300}></canvas>
                <div className="">
                    <div className="canvas-control">
                        <label htmlFor="shape">Shape:</label>
                        <select 
                            value={shape} 
                            onChange={(e) => setShape(e.target.value as Shape)}
                            title="shape"
                        >
                            <option value="rectangle">Rectangle</option>
                            <option value="circle">Circle</option>
                        </select>
                    </div>

                    <div className="canvas-control">
                        <label htmlFor="border-radius">Border Radius</label>
                        <input
                            type="range"
                            title="border-radius"
                            min="0"
                            max="50"
                            value={borderRadius}
                            onChange={(e) => setBorderRadius(Number(e.target.value))}
                            disabled={shape !== "rectangle"}
                        />
                    </div>

                    <div className="canvas-control">
                        <label htmlFor="fill-color">Fill Color</label>
                        <input 
                            type="color" 
                            title="fill-color"
                            value={color} 
                            onChange={(e) => setColor(e.target.value)} 
                        />
                    </div>

                    <div className="canvas-control">
                        <label htmlFor="stroke-color">Stroke Color</label>
                        <input 
                            type="color" 
                            title="stroke-color"
                            value={stroke} 
                            onChange={(e) => setStroke(e.target.value)} 
                        />
                    </div>

                    <button
                        className="inline-block py-2 px-4 rounded-sm bg-black text-white"
                        onClick={() => {
                            const canvas = canvasRef.current;
                            if (canvas) {
                                const link = document.createElement("a");
                                link.download = "canvas.png";
                                link.href = canvas.toDataURL();
                                link.click();
                            }
                        }}
                    >
                        Save Canvas
                    </button>
                </div>
            </div>

        </main>
    )
}

export default FirstAssignmentPage;
