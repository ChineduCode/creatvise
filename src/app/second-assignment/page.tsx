'use client'

import React, { useRef, useState, useEffect } from "react";

type ShapeType = "rectangle" | "polygon";

interface Vertex {
    x: number;
    y: number;
}

interface Shape {
    type: ShapeType;
    vertices: Vertex[];
    color: string;
    stroke: string;
}

const gridSize = 20; // Size of the grid

const SecondAssignmentPage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [shapes, setShapes] = useState<Shape[]>([]);
    const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(null);
    const [draggingVertexIndex, setDraggingVertexIndex] = useState<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Redrawing canvas whenever shapes change
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(ctx);

        shapes.forEach((shape) => {
            drawShape(ctx, shape);
        });

    }, [shapes]);

    const drawGrid = (ctx: CanvasRenderingContext2D) => {
        ctx.strokeStyle = "#ddd";
        for (let x = 0; x < 800; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 600);
            ctx.stroke();
        }
        for (let y = 0; y < 600; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(800, y);
            ctx.stroke();
        }
    };

    const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape) => {
        ctx.beginPath();
        const { vertices, color, stroke } = shape;
        ctx.moveTo(vertices[0].x, vertices[0].y);
        vertices.forEach((vertex, i) => {
            if (i > 0) {
                ctx.lineTo(vertex.x, vertex.y);
            }
        });
        if (shape.type === "polygon") {
            ctx.closePath();
        }
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = stroke;
        ctx.stroke();
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        let shapeIndex = null;
        let vertexIndex = null;

        // Checking if a vertex is being clicked
        for (let i = 0; i < shapes.length; i++) {
            const shape = shapes[i];
            for (let j = 0; j < shape.vertices.length; j++) {
                const vertex = shape.vertices[j];
                if (Math.abs(vertex.x - mouseX) < 10 && Math.abs(vertex.y - mouseY) < 10) {
                shapeIndex = i;
                vertexIndex = j;
                break;
                }
            }
            if (vertexIndex !== null) break;
        }

        setSelectedShapeIndex(shapeIndex);
        setDraggingVertexIndex(vertexIndex);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (selectedShapeIndex === null || draggingVertexIndex === null) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const snappedX = Math.round(mouseX / gridSize) * gridSize;
        const snappedY = Math.round(mouseY / gridSize) * gridSize;

        const newShapes = [...shapes];
        newShapes[selectedShapeIndex].vertices[draggingVertexIndex] = { x: snappedX, y: snappedY };
        setShapes(newShapes);
    };

    const handleMouseUp = () => {
        setDraggingVertexIndex(null);
    };

    const addRectangle = () => {
        setShapes([
            ...shapes,
            {
                type: "rectangle",
                vertices: [
                    { x: 100, y: 100 },
                    { x: 200, y: 100 },
                    { x: 200, y: 200 },
                    { x: 100, y: 200 },
                ],
                color: "#e74c3c",
                stroke: "#2c3e50",
            },
        ]);
    };

    const addPolygon = () => {
        setShapes([
            ...shapes,
            {
                type: "polygon",
                vertices: [
                    { x: 300, y: 300 },
                    { x: 400, y: 250 },
                    { x: 450, y: 350 },
                    { x: 350, y: 400 },
                ],
                color: "#2ecc71",
                stroke: "#34495e",
            },
        ]);
    };

    return (
        <main className="flex flex-col items-center gap-5 h-screen p-8">
            <div className="flex items-center gap-5">
                <button className="bg-black text-white px-4 py-2 rounded-lg" onClick={addRectangle}>Add Rectangle</button>
                <button className="bg-black text-white px-4 py-2 rounded-lg" onClick={addPolygon}>Add Polygon</button>
            </div>
            <canvas
                ref={canvasRef}
                width={600}
                height={450}
                className="border mt-4"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            ></canvas>
        </main>
    );
};

export default SecondAssignmentPage;
