import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("uuid")) {
      router.push("/signin");
    } else {
      router.push("/dashboard");
    }
  }, [router]);
  return (
    <>
      <Text>Dashboard Home</Text>
    </>
  );
}
