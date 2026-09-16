import type { SVGAttributes } from 'react';

export default function AppLogoIcon(
    props: SVGAttributes<SVGElement>,
) {
    return (
        <svg
            {...props}
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
        >
            <text
                x="20"
                y="28"
                textAnchor="middle"
                fontSize="28"
                fontWeight="700"
                fill="currentColor"
            >
                C
            </text>
        </svg>
    );
}