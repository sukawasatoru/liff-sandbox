import {GetStaticProps, NextPage} from "next";
import Head from "next/head";

interface Props {
  hello: string;
}

const Index: NextPage<Props> = (props) => {
  return <>
    <Head>
      <title>
        LIFF Sandbox
      </title>
    </Head>
  </>;
};

export const getStaticProps: GetStaticProps<Props> = async context => {
  return {
    props: {
      hello: "Hello",
    },
  };
};

export default Index;
