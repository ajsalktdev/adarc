import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

const FilterPageBreadCrumbs = () => {
    const params = useParams();
    const primarySlug = params?.primarySlug;
    const secondarySlug = params?.secondarySlug;
    const tertiarySlug = params?.tertiarySlug;

    const breadcrumbs = [];

    const formatBreadcrumbText = (text: any) => {
        return text
            .replace(/[-_]/g, ' ') // handle both dashes and underscores
            .split(' ')
            .map((word:any) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Add Home
    breadcrumbs.push({
        label: 'Home',
        href: '/',
    });

    // Add Primary only if it's not 'search'
    if (primarySlug && primarySlug !== 'search') {
        breadcrumbs.push({
            label: formatBreadcrumbText(primarySlug),
            href: `/${primarySlug}`,
        });
    }

    // Add Secondary
    if (secondarySlug) {
        breadcrumbs.push({
            label: formatBreadcrumbText(secondarySlug),
            href: `/${primarySlug}/${secondarySlug}`,
        });
    }

    // Add Tertiary
    if (tertiarySlug) {
        breadcrumbs.push({
            label: formatBreadcrumbText(tertiarySlug),
            href: `/${primarySlug}/${secondarySlug}/${tertiarySlug}`,
        });
    }

    return (
        <div className="flex items-center flex-wrap gap-2  max-sk:gap-1 text-sm text-gray-600 mt-4 mb-2 px-2">
            {breadcrumbs?.map((crumb, index) => (
                <React.Fragment key={crumb.href}>
                    {index > 0 && <span className="mx-2 max-sk:mx-1">{'>'}</span>}
                    {index === breadcrumbs.length - 1 ? (
                        <span className="text-gray-900 font-medium text-[14px] max-sm:text-[12px]">{crumb?.label}</span>
                    ) : (
                        <Link href={crumb.href} className="hover:text-gray-900 font-medium text-[14px] max-sm:text-[12px]">
                            {crumb?.label}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default FilterPageBreadCrumbs;
