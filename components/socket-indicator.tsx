'use client';

import React from 'react';
import { useSocket } from '@/components/providers/socket-provider';
import { Badge } from './ui/badge';

export const SocketIndicator = () => {
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <Badge
                className="bg-yellow-600 text-white border-none"
                variant="outline"
            >
                Fallback: Polling every 1s
            </Badge>
        );
    }

    return (
        <Badge
            className="bg-emerald-600 text-white border-none"
            variant="outline"
        >
            Live:React-time updates
        </Badge>
    );
};
