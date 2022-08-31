import Link from 'next/link';

interface IProps {
    href: string;
    className?: string;
    target?: string;
    children: JSX.Element | string;
    prefixLink?: () => JSX.Element | string;
    postfixLink?: () => JSX.Element | string;
}

export default function NavPagesLink({
    href,
    className,
    target,
    children,
    prefixLink,
    postfixLink,
}: IProps): JSX.Element {
    return (
        <>
            {prefixLink && prefixLink()}
            <Link href={href} passHref>
                <a href="replace" className={className || ''} target={target}>
                    {children}
                </a>
            </Link>
            {postfixLink && postfixLink()}
        </>
    );
}
