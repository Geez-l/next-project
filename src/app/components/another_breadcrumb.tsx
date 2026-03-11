"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";

export default function BreadCrumbsUI() {

    const pathname = usePathname();

    const currentPage = navigation.find((item) => item.href === pathname);
    return (
        <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb">
                {/* Home */}
                <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                </li>

                {/* Current Page */}
                {pathname !== "/" && currentPage && (
                    <li className="breadcrumb-item active">
                        {currentPage.label}
                    </li>
                )}
            </ol>
        </nav>


    );
}