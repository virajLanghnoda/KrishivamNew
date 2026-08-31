import logo from "../assets/krishivam-logo.svg";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <img
      src={logo}
      alt="Krishivam Agriscience Private Limited"
      className={
        compact
          ? "h-12 w-auto object-contain"
          : "h-16 w-auto max-w-[300px] object-contain"
      }
    />
  );
}