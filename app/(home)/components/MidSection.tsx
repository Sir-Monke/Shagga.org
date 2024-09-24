'use client';
import Image from "next/image";
import React from "react";
import Imaged from '@/app/images/Shagga.jpg';

export default function MidSection() {
    return (
        <div className="flex items-center justify-between px-[100px]">
            <div className="flex-1 mr-8 rounded-lg shadow-lg p-10 bg-black bg-opacity-50">
                <h2 className="text-4xl font-extrabold mb-6 text-white">How To Be A Shagga</h2>
                <p className="text-xl text-white mb-8">
                    Follow these essential steps to master the shagga lifestyle:
                </p>
                <ol className="list-decimal list-inside text-white">
                    <li className="mb-6">
                        <strong className="text-xl">Channel Your Inner Hello Kitty:</strong> like hello kitty, eat sleep repeat hello kitty...
                    </li>
                    <li className="mb-6">
                        <strong className="text-xl">Bedtime:</strong> THERE IS NO BEDTIME, shaggas too gangsta for this bedtime shenanigans.
                    </li>
                    <li className="mb-6">
                        <strong className="text-xl">Procrastination:</strong> I'll do this one later.
                    </li>
                    <li className="mb-6">
                        <strong className="text-xl">Never Stop Shaggin Shagga:</strong> DON'T STOP BEELLIIEEEEVVIINNNGGG.
                    </li>
                    <li className="mb-6">
                        <strong className="text-xl">Shift Gears Without the Clutch:</strong> Who needs the clutch? It's just there so the government can keep funding flattening the earth.
                    </li>
                </ol>
                <p className="text-xs text-black mt-4">
                    The following of these steps is highly prohibited, and you're advised not to.
                </p>
            </div>
            <div className="flex-1 flex justify-center items-center">
                <Image 
                    src={Imaged} 
                    alt="Top Shagga" 
                    className="rounded-lg shadow-lg"
                    height={700}
                />
            </div>
        </div>
    );
}
