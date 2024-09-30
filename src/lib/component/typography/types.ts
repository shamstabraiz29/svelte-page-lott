export type AsType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'label' | 'span' | 'strong';

export type StyleType = {
    size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    color?: 'primary' | 'secondary' | 'error' | 'success' | 'light' | 'white';
    fontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
};

export type TypographyProps = {
    as?: AsType;
    children?: string | number; 
    className?: string;
    fontStyles?: StyleType;
};