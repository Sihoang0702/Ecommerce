import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function MarkdownEditor({
  label = "Description",
  value = "",
  changeValue = () => {},
  name = "",
  invalidFelid,
  setInvalidFelid,
  ...rest
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor="" className="my-6">
        {label}
      </label>
      <Editor
        apiKey="ct1xbdudi75b9pr462t0dtghjcm9qh785bqees4ff3aj4rgd"
        init={{
          plugins:
            "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          ai_request: (request, respondWith) =>
            respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
        }}
        initialValue={value}
        onChange={(e) => changeValue((prev) => ({ ...prev, [name]: e.target.getContent() }))}
        onFocus={() => setInvalidFelid && setInvalidFelid([])}
      />
      {/* {invalidFelid?.some((el) => el.name === name) && (
        <small>{invalidFelid.find((el) => el.name === name)?.message}</small>
      )} */}
    </div>
  );
}
