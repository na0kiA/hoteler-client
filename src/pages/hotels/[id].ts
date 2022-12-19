import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
// import Layout from '../../components/Layout'
// import { getAllPostIds, getPostData } from '../../lib/fetch'
import { HotelDetail } from './types/types.tsx'

const PostDetail: React.FC<POST> = ({
  title,
  content,
  username,
  tags,
  created_at,
}) => {
  return (
    <Layout title={title}>
      <div>
        {tags && tags.map((tag, i) => <span key={tag.id}>{tag.name}</span>)}
      </div>
      <p className="m-10 text-xl font-bold">{title}</p>
      <p className="mx-10 mb-12">{content}</p>
      <p>{created_at}</p>
      <p className="mt-3">
        {'by '} {username}
      </p>
      <Link href="/">
        <div className="flex cursor-pointer mt-12">
          <a data-testid="back-blog">Back to blog-page</a>
        </div>
      </Link>
    </Layout>
  )
}
export default PostDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  //const { post: post } = await getPostData(ctx.params.id as string)
  const post = await getPostData(ctx.params.id as string)
  return {
    props: {
      ...post,
    },
    revalidate: 3,
  }
}