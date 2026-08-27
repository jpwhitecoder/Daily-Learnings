"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {ArrowRight} from "lucide-react"
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const [activeTab, setActiveTab] = useState("organize");

  return <div className="flex min-h-screen flex-col bg-white">
    <main className="flex-1">
      
        {/* hero section */}
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-black mb-6 text-6xl font-bold">A better way to track your job application</h1>
            <p className="text-muted-foreground mb-10 text-xl">Capture, Organize, adn manage your job search in one place</p>
            <div className="flex flex-col items-center gap-4">
              <Link href="/sign-up" >
                <Button size="lg" className="h-12 px-8 text-lg font-medium">
                  Start for free <ArrowRight className="ml-2"></ArrowRight>
                </Button>
              </Link>
              {/* <Button>Start for free</button> */}
              <p className="text-sm test-muted-foreground">Free forever. No credit card required</p>
            </div>
          </div>
        </section>

        {/* Hero Images section with Tabs */}

        <section className="border-t bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              {/* Tabs */}
              <div className="flex gap-2 justify-center mb-8">
                <Button onClick={() => setActiveTab("organize")}>Organize applications</Button>
                <Button onClick={() => setActiveTab("hired")}>Get Hired</Button>
                <Button onClick={() => setActiveTab("boards")}>Manage Boards</Button>
              </div>
              <div className="relative mx-auto max-w-5xl rounded-lg border  border-gray-200 shadow-xl ">
                { activeTab === "organize" && <Image src="/hero-images/hero1.png" alt="Organize applications"  width={1200} height={800}></Image>}
                { activeTab === "hired" && <Image src="/hero-images/hero2.png" alt="Organize applications"  width={1200} height={800}></Image>}
                { activeTab === "boards" &&<Image src="/hero-images/hero3.png" alt="Organize applications"  width={1200} height={800}></Image>}
              </div>
            </div>
          </div>

        </section>
      
    </main>
  </div>
}
