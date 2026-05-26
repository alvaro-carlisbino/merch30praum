import {
  FolderIcon,
  FolderOpenIcon,
  ExeIcon,
  ImageIcon,
  MediaIcon,
  MyComputerIcon,
  PeopleIcon,
  CartIcon,
  CalendarIcon,
  CassetteIcon,
} from "./PixelIcons";

/**
 * Map de keys serializáveis → componentes de ícone.
 * Usado pra passar ícones via store (que não suporta React nodes).
 */
export const ICON_BY_KEY: Record<string, React.FC<{ size?: number; className?: string }>> = {
  folder: FolderIcon,
  folderOpen: FolderOpenIcon,
  exe: ExeIcon,
  image: ImageIcon,
  media: MediaIcon,
  myComputer: MyComputerIcon,
  people: PeopleIcon,
  cart: CartIcon,
  calendar: CalendarIcon,
  cassette: CassetteIcon,
};

export function renderIcon(key: string | undefined, size = 14) {
  if (!key) return null;
  const Icon = ICON_BY_KEY[key];
  if (!Icon) return null;
  return <Icon size={size} />;
}
