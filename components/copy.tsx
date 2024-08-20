"use client"
import {IoCopyOutline} from "react-icons/io5"

interface CopyProps {
    contentToCopy: string
    tooltipPosition?: "top" | "bottom" | "left" | "right"
}

export default function Copy({contentToCopy}: CopyProps) {

    function copyToClipboard(e: any) {
        e.stopPropagation()
        navigator.clipboard.writeText(contentToCopy)
    }

    return (
        <IoCopyOutline className="cursor-pointer opacity-70 hover:opacity-30" onClick={(e) => copyToClipboard(e)}/>
    )
}