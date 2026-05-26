import Image from "next/image";
import Link from "next/link";
import { Window } from "@/components/lanhouse/Window";
import { WindowsButton } from "@/components/lanhouse/WindowsButton";
import {
  FolderIcon,
  MyComputerIcon,
  FolderOpenIcon,
} from "@/components/lanhouse/PixelIcons";

export const metadata = {
  title: "loja/ — 30praum",
  description: "Catálogo completo do merch oficial 30praum.",
};

type FileItem = {
  id: string;
  href: string;
  label: string;
  thumb: string;
  size: string;
  kind: "JPG" | "PNG";
};

const ARTISTS_FOLDERS = [
  { slug: "matue", label: "MATUE\\", items: 12 },
  { slug: "wiu", label: "WIU\\", items: 8 },
  { slug: "teto", label: "TETO\\", items: 6 },
  { slug: "brandao", label: "BRANDAO85\\", items: 9 },
];

const FILES: FileItem[] = [
  { id: "f1", href: "/matue/camiseta-333-azul-eletrico", label: "333_azul_eletrico.jpg", thumb: "/figma-home/produto-green-puffer.png", size: "189,00", kind: "JPG" },
  { id: "f2", href: "/matue/camiseta-respeito", label: "respeito.jpg", thumb: "/figma-home/produto-respeito.png", size: "189,00", kind: "JPG" },
  { id: "f3", href: "/matue/camiseta-game-face", label: "game_face.jpg", thumb: "/figma-home/produto-face.png", size: "189,00", kind: "JPG" },
  { id: "f4", href: "/matue/puffer-black-333", label: "puffer_black.png", thumb: "/figma-home/produto-black-puffer.png", size: "489,00", kind: "PNG" },
  { id: "f5", href: "/matue/camiseta-sabotage", label: "sabotage.jpg", thumb: "/figma-home/produto-sabotage.png", size: "189,00", kind: "JPG" },
  { id: "f6", href: "/wiu/mv-1", label: "mv1.png", thumb: "/figma-loja/mv-1.png", size: "189,00", kind: "PNG" },
  { id: "f7", href: "/wiu/mv-2", label: "mv2.png", thumb: "/figma-loja/mv-2.png", size: "189,00", kind: "PNG" },
  { id: "f8", href: "/teto/mv-3", label: "mv3.png", thumb: "/figma-loja/mv-3.png", size: "189,00", kind: "PNG" },
  { id: "f9", href: "/teto/mv-4", label: "mv4.png", thumb: "/figma-loja/mv-4.png", size: "189,00", kind: "PNG" },
  { id: "f10", href: "/brandao/ep-1", label: "ep1.png", thumb: "/figma-loja/ep-1.png", size: "169,00", kind: "PNG" },
  { id: "f11", href: "/brandao/ep-2", label: "ep2.png", thumb: "/figma-loja/ep-2.png", size: "169,00", kind: "PNG" },
  { id: "f12", href: "/brandao/ep-3", label: "ep3.png", thumb: "/figma-loja/ep-3.png", size: "169,00", kind: "PNG" },
];

export default function LojaPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-3 py-6 sm:px-6 sm:py-10">
      <Window
        title="loja/ — Meu Computador"
        icon={<MyComputerIcon size={14} />}
        menubar={["Arquivo", "Editar", "Exibir", "Favoritos", "Ferramentas", "Ajuda"]}
        bodyClassName="p-0"
        statusBar={
          <>
            <span>{ARTISTS_FOLDERS.length} pastas, {FILES.length} arquivos</span>
            <span>30praum · loja</span>
          </>
        }
      >
        {/* address bar */}
        <div className="flex items-center gap-2 border-b border-[#aca899] bg-[#ece9d8] px-2 py-1">
          <span className="font-mono text-[11px] text-black">Endereço:</span>
          <div className="flex h-[20px] flex-1 items-center gap-1 border border-[#7f7f7f] bg-white px-2 font-mono text-[11px] text-black">
            <FolderOpenIcon size={14} />
            <span>C:\30praum\loja\</span>
          </div>
          <WindowsButton className="min-w-0 h-[20px]">Ir</WindowsButton>
        </div>

        <div className="grid grid-cols-[180px_1fr] min-h-[520px]">
          {/* sidebar esquerda — tasks XP */}
          <aside className="border-r border-[#aca899] p-2" style={{ background: "linear-gradient(to bottom, #c1d2ee, #7fa3d6)" }}>
            <div className="mb-3 border border-[#fff] bg-white p-2">
              <p className="mb-1 font-bold text-[11px] text-black">Tarefas de arquivo e pasta</p>
              <ul className="space-y-1 text-[11px] text-[#0a246a] underline">
                <li><a href="#">criar nova pasta</a></li>
                <li><a href="#">publicar pasta na web</a></li>
                <li><a href="#">compartilhar pasta</a></li>
              </ul>
            </div>

            <div className="mb-3 border border-[#fff] bg-white p-2">
              <p className="mb-1 font-bold text-[11px] text-black">Outros locais</p>
              <ul className="space-y-1 text-[11px]">
                <li>
                  <Link href="/" className="text-[#0a246a] underline">
                    Área de trabalho
                  </Link>
                </li>
                <li>
                  <Link href="/artistas" className="text-[#0a246a] underline">
                    artistas\
                  </Link>
                </li>
                <li>
                  <Link href="/plantao" className="text-[#0a246a] underline">
                    plantão\
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="text-[#0a246a] underline">
                    sacola\
                  </Link>
                </li>
              </ul>
            </div>

            <div className="border border-[#fff] bg-white p-2">
              <p className="mb-1 font-bold text-[11px] text-black">Detalhes</p>
              <p className="text-[11px] text-[#333]">
                <strong>loja</strong>
                <br />
                pasta de arquivos
                <br />
                modificado em: hoje
                <br />
                tipo: catálogo aberto
              </p>
            </div>
          </aside>

          {/* área principal — pastas e arquivos */}
          <section className="bg-white p-3">
            <h2 className="mb-2 font-mono text-[11px] uppercase text-[#666]">Pastas</h2>
            <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {ARTISTS_FOLDERS.map((f) => (
                <Link
                  key={f.slug}
                  href={`/${f.slug}`}
                  className="explorer-item flex flex-col items-center gap-1 p-2 text-center"
                >
                  <FolderIcon size={48} />
                  <span className="font-mono text-[11px] text-black">{f.label}</span>
                  <span className="font-mono text-[10px] text-[#666]">{f.items} itens</span>
                </Link>
              ))}
            </div>

            <h2 className="mb-2 font-mono text-[11px] uppercase text-[#666]">Arquivos</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {FILES.map((file) => (
                <Link
                  key={file.id}
                  href={file.href}
                  className="explorer-item flex flex-col items-center gap-1 p-2 text-center"
                >
                  <div className="relative h-[88px] w-[88px] border border-[#777] bg-[#fafafa]">
                    <Image
                      src={file.thumb}
                      alt={file.label}
                      fill
                      sizes="88px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <span className="block max-w-[100px] truncate font-mono text-[11px] text-black">
                    {file.label}
                  </span>
                  <span className="font-mono text-[10px] text-[#666]">
                    {file.kind} · R$ {file.size}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Window>
    </div>
  );
}
