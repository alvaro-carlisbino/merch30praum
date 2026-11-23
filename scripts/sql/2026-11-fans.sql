-- Contas de fã do chat. Produção roda com push desligado, então aplique este
-- arquivo no banco ANTES de publicar o código. Pode rodar mais de uma vez.
BEGIN;

CREATE TABLE IF NOT EXISTS public.fans (
  id serial PRIMARY KEY,
  shopify_customer_id character varying NOT NULL,
  email character varying NOT NULL,
  nickname character varying,
  nickname_key character varying,
  first_name character varying,
  last_name character varying,
  phone character varying,
  birth_date timestamp(3) with time zone,
  city character varying,
  state character varying,
  accepted_terms_at timestamp(3) with time zone,
  terms_version character varying,
  last_login_at timestamp(3) with time zone,
  last_message_at timestamp(3) with time zone,
  session_version numeric DEFAULT 1 NOT NULL,
  updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
  created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS fans_shopify_customer_id_idx ON public.fans (shopify_customer_id);
CREATE UNIQUE INDEX IF NOT EXISTS fans_nickname_key_idx ON public.fans (nickname_key);
CREATE INDEX IF NOT EXISTS fans_email_idx ON public.fans (email);
CREATE INDEX IF NOT EXISTS fans_updated_at_idx ON public.fans (updated_at);
CREATE INDEX IF NOT EXISTS fans_created_at_idx ON public.fans (created_at);

ALTER TABLE public.mural_messages ADD COLUMN IF NOT EXISTS fan_id integer;
ALTER TABLE public.payload_locked_documents_rels ADD COLUMN IF NOT EXISTS fans_id integer;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'mural_messages_fan_id_fans_id_fk') THEN
    ALTER TABLE public.mural_messages
      ADD CONSTRAINT mural_messages_fan_id_fans_id_fk FOREIGN KEY (fan_id) REFERENCES public.fans(id) ON DELETE SET NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_fans_fk') THEN
    ALTER TABLE public.payload_locked_documents_rels
      ADD CONSTRAINT payload_locked_documents_rels_fans_fk FOREIGN KEY (fans_id) REFERENCES public.fans(id) ON DELETE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS mural_messages_fan_idx ON public.mural_messages (fan_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_fans_id_idx ON public.payload_locked_documents_rels (fans_id);

COMMIT;
