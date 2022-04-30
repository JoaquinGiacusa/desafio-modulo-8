import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import css from "./index.css";
import previewImg from "../../img/previewImg.svg";
import { MainButton } from "../../ui/buttons";
import { MainText } from "../../ui/text-font";

type PropsDropZoneEl = {
  onChange?;
};

export function DropZoneEl(props: PropsDropZoneEl) {
  const [files, setFiles] = useState([]);
  const { getRootProps } = useDropzone({
    accept: "image/*",
    noDrag: true,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
    },
  });

  const thumbs = files.map((file) => {
    return (
      <div className={css.imgContainer} key={file.name}>
        <img
          src={file.preview}
          className={css.img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    );
  });

  useEffect(() => {
    if (files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = function () {
        props.onChange(reader.result);
      };
    }
  });

  return (
    <section className="container">
      {files.length == 0 && <img src={previewImg} />}
      <aside className={css.thumbsContainer}>{thumbs}</aside>
      <div {...getRootProps({ className: "dropzone" })}>
        <MainButton>
          <MainText>agregar/modificar foto</MainText>
        </MainButton>
      </div>
    </section>
  );
}
