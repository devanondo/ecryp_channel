'use client';

import qs from 'query-string';

import React from 'react';
import ActionTooltip from '../action-tooltip';
import { Video, VideoOff } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const ChatVideoButton = () => {
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const isVideo = searchParams?.get('video');

    const Icon = isVideo ? VideoOff : Video;
    const tooltioLabel = isVideo ? 'End Video call' : 'Start Video call';

    const onClick = () => {
        const url = qs.stringifyUrl(
            {
                url: pathName || '',
                query: {
                    video: isVideo ? undefined : true,
                },
            },
            { skipNull: true }
        );
        router.push(url);
    };

    return (
        <ActionTooltip side="bottom" label={tooltioLabel}>
            <button
                onClick={onClick}
                className="hover:opacity-75 transition mr-4"
            >
                <Icon className="h-5 w-6 text-zinc-500 dark:text-zinc-400 " />
            </button>
        </ActionTooltip>
    );
};
