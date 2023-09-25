import { db } from '@/lib/db';
import { InitalModal } from '@/components/modals/inital-modal';
import { initialProfile } from '@/lib/initial-profile';
import { redirect } from 'next/navigation';

const SetupPage = async () => {
    const profile = await initialProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return <InitalModal />;
};

export default SetupPage;
