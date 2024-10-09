import { useRef } from "react";
import { useCallback } from "react";
import { memo } from "react";
import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { useState } from "react";
// Icons
import RightArrow from "./Icons/RightArrow";
// Components
import FileInput from "./FileInput";
import TextInput from "./TextInput";
export default memo(function Form({
  dataHandler
}: any) {
  // States
  const [genomeString, setGenomeString] = useState<string>("");
  const genomeFile = useRef<any>(null);
  // Handlers
  function submitHandler(e: any) {
    // Disable default behaviour.
    e.preventDefault();
    // Send data to index.
    dataHandler(genomeString, genomeFile.current);
    resetInputs();
  }

  //Effects
  useEffect(() => {
    if (genomeFile.current === null) return;
    // Send data to index after file is uploaded.
    dataHandler(genomeString, genomeFile.current);
    resetInputs();
  }, [genomeFile.current]);
  // Functions
  function resetInputs() {
    genomeFile.current = null;
    setGenomeString("");
  }
  return <form onSubmit={submitHandler} className="flex flex-col items-center gap-4">
      {/* Text input. */}
      <TextInput value={genomeString} handleChange={useCallback((newValue: string) => setGenomeString(newValue), [setGenomeString])} />
      <span className="text-xl text-gray-500">lub</span>
      {/* File input. */}
      <FileInput uploadFileHandler={useCallback((newFile: any) => genomeFile.current = newFile, [setGenomeFile])} />
    </form>;
});