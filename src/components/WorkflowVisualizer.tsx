'use client';

import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
    Background,
    Controls,
    Handle,
    Position,
    MarkerType,
    useNodesState,
    useEdgesState,
    Edge,
    Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Bot, Play, MessageSquare, ShieldCheck, Mail, Database, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Node Types
const CustomNode = ({ data, selected }: any) => {
    return (
        <div className={`px-4 py-3 rounded-xl glass border ${selected ? 'border-cyan-400 neon-cyan' : 'border-white/10'} min-w-[180px]`}>
            <Handle type="target" position={Position.Left} className="!bg-cyan-400" />
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${data.active ? 'bg-cyan-500 text-black' : 'bg-white/5 text-zinc-400'}`}>
                    {data.icon}
                </div>
                <div>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">{data.type}</div>
                    <div className="text-sm font-semibold">{data.label}</div>
                </div>
            </div>
            <Handle type="source" position={Position.Right} className="!bg-purple-400" />

            {data.active && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
            )}
        </div>
    );
};

const nodeTypes = {
    custom: CustomNode,
};

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'custom',
        position: { x: 50, y: 150 },
        data: { label: 'Recepción Lead (WA)', type: 'Trigger', icon: <MessageSquare className="w-4 h-4" />, active: false },
    },
    {
        id: '2',
        type: 'custom',
        position: { x: 300, y: 150 },
        data: { label: 'Análisis IA', type: 'Agent', icon: <Bot className="w-4 h-4" />, active: false },
    },
    {
        id: '3',
        type: 'custom',
        position: { x: 550, y: 150 },
        data: { label: '¿Lead Calificado?', type: 'Decision', icon: <ShieldCheck className="w-4 h-4" />, active: false },
    },
    {
        id: '4a',
        type: 'custom',
        position: { x: 800, y: 50 },
        data: { label: 'Agendar CRM', type: 'Action', icon: <Database className="w-4 h-4" />, active: false },
    },
    {
        id: '4b',
        type: 'custom',
        position: { x: 800, y: 250 },
        data: { label: 'Nutrición Email', type: 'Action', icon: <Mail className="w-4 h-4" />, active: false },
    },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: false, style: { stroke: '#444' } },
    { id: 'e2-3', source: '2', target: '3', animated: false, style: { stroke: '#444' } },
    { id: 'e3-4a', source: '3', target: '4a', label: 'Sí', labelStyle: { fill: '#00f7ff', fontWeight: 700 }, animated: false, style: { stroke: '#444' } },
    { id: 'e3-4b', source: '3', target: '4b', label: 'No', labelStyle: { fill: '#bc13fe', fontWeight: 700 }, animated: false, style: { stroke: '#444' } },
];

export default function WorkflowVisualizer() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (msg: string) => {
        setLogs(prev => [...prev.slice(-4), msg]);
    };

    const runSimulation = async () => {
        if (isRunning) return;
        setIsRunning(true);
        setLogs([]);

        // Step 1: Trigger
        addLog("Oído: Nueva entrada de lead detectada...");
        setNodes(nds => nds.map(n => n.id === '1' ? { ...n, data: { ...n.data, active: true } } : n));
        await new Promise(r => setTimeout(r, 1000));

        // Step 2: IA Agent
        setNodes(nds => nds.map(n => n.id === '1' ? { ...n, data: { ...n.data, active: false } } : n));
        setNodes(nds => nds.map(n => n.id === '2' ? { ...n, data: { ...n.data, active: true } } : n));
        setEdges(eds => eds.map(e => e.id === 'e1-2' ? { ...e, animated: true, style: { stroke: '#00f7ff' } } : e));
        addLog("Pensando: Analizando sentimiento e intención...");
        await new Promise(r => setTimeout(r, 1500));

        // Step 3: Decision
        setNodes(nds => nds.map(n => n.id === '2' ? { ...n, data: { ...n.data, active: false } } : n));
        setNodes(nds => nds.map(n => n.id === '3' ? { ...n, data: { ...n.data, active: true } } : n));
        setEdges(eds => eds.map(e => e.id === 'e2-3' ? { ...e, animated: true, style: { stroke: '#00f7ff' } } : e));
        addLog("Evaluando: Intención de compra detectada (Lead Calificado).");
        await new Promise(r => setTimeout(r, 1000));

        // Step 4: Final Action (CRM)
        const success = Math.random() > 0.3;
        setNodes(nds => nds.map(n => n.id === '3' ? { ...n, data: { ...n.data, active: false } } : n));
        const target = success ? '4a' : '4b';
        const edgeId = success ? 'e3-4a' : 'e3-4b';

        setNodes(nds => nds.map(n => n.id === target ? { ...n, data: { ...n.data, active: true } } : n));
        setEdges(eds => eds.map(e => e.id === edgeId ? { ...e, animated: true, style: { stroke: success ? '#00f7ff' : '#bc13fe' } } : e));
        addLog(success ? "Acción: Sincronizando datos con el CRM..." : "Acción: Agregando a flujo de nutrición...");
        await new Promise(r => setTimeout(r, 2000));

        // Finish
        setNodes(nds => nds.map(n => ({ ...n, data: { ...n.data, active: false } })));
        setEdges(initialEdges);
        setIsRunning(false);
        addLog("Cerrado: Ejecución completada con éxito.");
    };

    return (
        <div className="w-full h-full relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                contentEditable={false}
                className="bg-transparent"
            >
                <Background color="#222" gap={20} />
                <Controls showInteractive={false} className="bg-zinc-800 border-zinc-700 fill-white" />
            </ReactFlow>

            {/* Side Panel Console */}
            <div className="absolute bottom-6 right-6 w-80 glass border border-white/10 rounded-2xl overflow-hidden z-20">
                <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400">
                        <Terminal className="w-3 h-3" />
                        AGENT_REASONING_LOG
                    </div>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                </div>
                <div className="p-4 h-40 overflow-hidden flex flex-col gap-2 font-mono text-[11px]">
                    <AnimatePresence>
                        {logs.length === 0 && <div className="text-zinc-600 italic">Esperando ejecución...</div>}
                        {logs.map((log, i) => (
                            <motion.div
                                key={i + log}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-cyan-400"
                            >
                                <span className="text-zinc-600 mr-2">{'>'}</span> {log}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <div className="absolute top-6 left-6 z-20">
                <button
                    onClick={runSimulation}
                    disabled={isRunning}
                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${isRunning
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            : 'bg-cyan-500 text-black hover:neon-cyan hover:scale-105 active:scale-95'
                        }`}
                >
                    <Play className={`w-4 h-4 ${isRunning ? 'animate-pulse' : ''}`} />
                    {isRunning ? 'Agente Ejecutando...' : 'Ejecutar Prueba de Agente'}
                </button>
            </div>
        </div>
    );
}
