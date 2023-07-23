'use client'

import { useState } from "react";
import { truncateString } from "../helper/trunctuateText";
import { publications } from "./data";

const IconUp = () => 
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>

const IconDown = () => 
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>


const Publication = 
    ({title, arthors, journal, link, abstract}:{title:string, authors:string[], journal:string, link:string, abstract: string}) => 
        <a href={link} target="_blank">
            <div className="hover:shadow-xl hover:bg-slate-100 transition-all border p-6 my-8">
                <h2 className="text-lg font-bold">{title}</h2>
                <div>{journal}</div>
                <div className="text-slate-600">{truncateString(abstract,300)}</div>
            </div>
        </a>
    

export const PublicationCards = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalPublicationCount = publications.length;

    const hasLaterPublications = currentIndex > 0;
    const hasEarlierPublications = currentIndex + 5 < totalPublicationCount;

    const visiblePublications = publications.slice(currentIndex, hasEarlierPublications? currentIndex + 5 : totalPublicationCount)

    

    return (
        <div>
            {!hasLaterPublications &&                
                <div className="flex flex-col items-center scale-75 text-slate-500">
                    This is the newest publication
                </div> 
            }
            {hasLaterPublications && 
                <div className="flex flex-col items-center scale-75 hover:scale-100 transition-all" onClick={()=>setCurrentIndex(Math.max(0, currentIndex - 5))}>
                    View more newer publications
                    <IconUp />
                </div>
            }
            {visiblePublications.map((publication,i)=><Publication {...publication} key={i}/>)}
            {hasEarlierPublications && 
                <div className="flex flex-col items-center scale-75 hover:scale-100 transition-all" onClick={()=>setCurrentIndex(Math.min(totalPublicationCount - 5, currentIndex + 5))}>
                    View more earlier publications
                    <IconDown />
                </div>
            }
            {!hasEarlierPublications &&                
                <div className="flex flex-col items-center scale-75 text-slate-500">
                    No more earlier publication
                </div> 
            }
        </div>)

}