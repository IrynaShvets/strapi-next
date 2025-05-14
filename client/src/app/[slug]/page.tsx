import { getPageBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRenderer";

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  console.log("data loader",data);
  
  if (data.length === 0) notFound();
  return { blocks: data[0]?.blocks };
}

interface PageProps {
  params: Promise<{ slug: string }>
}


// export default async function DynamicPageRoute({ params }: PageProps) {
//   const slug = (await params).slug;
//   const { blocks } = await loader(slug);
//   return <BlockRenderer blocks={blocks} />;
// }

export default async function DynamicPageRoute({ params }: PageProps) {
  const slug = (await params).slug;
  const { blocks } = await loader(slug);
 // console.log(blocks);
 return <BlockRenderer blocks={blocks} />;
  // return (
  //   <div>
  //     <h1>Slug: {slug}</h1>
  //   </div>
  // );
}