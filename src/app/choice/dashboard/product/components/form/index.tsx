"use client";

import { ChangeEvent, useState, FormEvent } from "react";
import styles from "./styles.module.scss";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/dashboard/components/button";
import { api } from "@/services/api";
import { getCookiesServer } from "@/lib/cookieServer";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CategoryProps {
  id: string;
  name: string;
}

interface Props {
  categories: CategoryProps[];
}

export function Form({ categories }: Props) {
  const router = useRouter();
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");
  const [price, setPrice] = useState("");

  async function handleRegisterProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Evita o reload da página
    const formData = new FormData(event.currentTarget);
    const categoryIndex = formData.get("category") as string;
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;

    if (!name || !categoryIndex || !price || !description || !image) {
      toast.warning("Preencha todos os campos");
      return;
    }

    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("category_id", categories[Number(categoryIndex)].id);
    data.append("file", image);

    const token = getCookieClient();

    try {
      await api.post("/product", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Produto registrado com sucesso");
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      toast.warning("Falha ao cadastrar esse produto!");
    }
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        toast.warning("Formato não permitido");
        return;
      }
      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  }

  function mascaraMoeda(event: ChangeEvent<HTMLInputElement>) {
    const onlyDigits = event.target.value
      .split("")
      .filter((s) => /\d/.test(s))
      .join("")
      .padStart(3, "0");
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);
    const maskedValue = maskCurrency(digitsFloat);
    setPrice(maskedValue); 
    event.target.value = maskedValue;
  }

  const maskCurrency = (valor: string, locale = "pt-br", currency = "BRL") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(Number(valor));
  };

  return (
    <main className={styles.container}>
      <h1>Novo produto</h1>

      <form className={styles.form} onSubmit={handleRegisterProduct}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={30} color="#FFF" />
          </span>

          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}
          />

          {previewImage && (
            <Image
              alt="Imagem de preview"
              src={previewImage}
              className={styles.preview}
              fill={true}
              quality={100}
              priority={true}
            />
          )}
        </label>
        <select name="category">
          {categories && categories.length > 0 ? (
            categories.map((item, index) => (
              <option key={item.id} value={index}>
                {item.name}
              </option>
            ))
          ) : (
            <option>Não existe nenhuma categoria</option>
          )}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Digite o nome do produto..."
          required
          className={styles.input}
        />

        <input
          type="text"
          name="price"
          placeholder="Preço do produto..."
          required
          className={styles.input}
          value={price}
          onInput={mascaraMoeda}
        />

        <textarea
          className={styles.input}
          placeholder="Digite a descrição do produto"
          required
          name="description"
        ></textarea>
        <Button name="Cadastrar produto" />
      </form>
    </main>
  );
}
