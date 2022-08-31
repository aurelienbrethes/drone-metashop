import {
    GetStaticPaths,
    GetStaticProps,
    GetStaticPropsResult,
    NextPage,
} from 'next';
import { wpPages } from '@fetcher/wordpress.fetcher';
// eslint-disable-next-line import/no-extraneous-dependencies
import { WP_REST_API_Post } from 'wp-types';
import parse from 'html-react-parser';
import { legalPagesSlugs } from '@src/constants/legal-infos-pages.constants';

interface IProps {
    pageContent: WP_REST_API_Post;
}

const LegalInfosPage: NextPage<IProps> = ({ pageContent }: IProps) => (
    <>
        <h1 className="text-5xl mb-5">{pageContent.title.rendered}</h1>
        <div className="wp-page-content text-justify">
            {parse(pageContent.content.rendered)}
        </div>
    </>
);

export default LegalInfosPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = legalPagesSlugs.map((slug) => ({
        params: {
            slug,
        },
    }));

    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<IProps> = async (
    context,
): Promise<GetStaticPropsResult<IProps>> => {
    const { slug } = context.params as {
        slug: string;
    };

    const pageContent = await wpPages.getOne(slug);

    if (!pageContent)
        return {
            notFound: true,
        };

    return {
        props: {
            pageContent,
        },
        revalidate: 10,
    };
};
