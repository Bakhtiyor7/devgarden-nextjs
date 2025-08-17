"use client";

interface CategoryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function CategoryButton({
  children,
  onClick,
}: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-gray-600 press-start rounded-full text-base transition-all duration-200 w-auto hover:border-[#64DA87] px-4 py-2 active:text-[#64DA87]"
    >
      {children}
    </button>
  );
}
