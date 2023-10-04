/* eslint-disable no-console */

'use client';

import { useUser } from '@clerk/nextjs';
import '@livekit/components-styles';
import { Loader2 } from 'lucide-react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';

interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
}

import React, { useEffect, useState } from 'react';

export const MediaRoom = ({ audio, video, chatId }: MediaRoomProps) => {
    const { user } = useUser();
    const [token, setToken] = useState('');

    useEffect(() => {
        if (!user?.firstName || !user?.lastName) return;

        const name = `${user.firstName} ${user.lastName}`;

        (async () => {
            try {
                const resp = await fetch(
                    `/api/livekit?room=${chatId}&username=${name}`
                );
                const data = await resp.json();
                setToken(data.token);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [user?.firstName, user?.lastName, chatId]);

    if (token === '') {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />

                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading...
                </p>
            </div>
        );
    }

    return (
        <LiveKitRoom
            data-lk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            video={video}
            audio={audio}
            connect={true}
        >
            <VideoConference />
        </LiveKitRoom>
    );
};
