import Image from 'next/image';

const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
        case 'pending':
            return <Image src="/icons/pending.svg" width={15} height={15} />;
        case 'paid':
            return <Image src="/icons/paid.svg" width={15} height={15} />;
        case 'rejected':
            return <Image src="/icons/fail.svg" width={15} height={15} />;
        default:
            return <Image src="/icons/pending.svg" width={15} height={15} />;
    }
};

export default StatusIcon;
