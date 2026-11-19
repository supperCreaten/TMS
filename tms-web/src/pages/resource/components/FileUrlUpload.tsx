import { useState } from "react"
import { Button, Upload, type UploadFile, type UploadProps } from "tdesign-react"
import api from "@/api"
import { showMessage } from "@/utils/methods"

type FileUrlUploadProps = {
  value?: string
  onChange?: (url?: string) => void
  accept?: string
  tip?: string
  /** image | file */
  theme?: "image" | "file"
}

/** 上传后把返回 url 写回表单字段 */
export default function FileUrlUpload(props: FileUrlUploadProps) {
  const { value, onChange, accept, tip, theme = "file" } = props
  const [loading, setLoading] = useState(false)

  const requestMethod: UploadProps["requestMethod"] = async (file) => {
    const uploadFile = file as UploadFile
    const blob = uploadFile.raw
    if (!blob) {
      return { status: "fail", error: "文件无效" }
    }
    const formData = new FormData()
    formData.append("file", blob)
    setLoading(true)
    try {
      const data = (await api.uploadApi(formData)) as { url?: string }
      const url = data?.url
      if (!url) {
        return { status: "fail", error: "上传失败" }
      }
      onChange?.(url)
      return { status: "success", response: { url } }
    } catch {
      return { status: "fail", error: "上传失败" }
    } finally {
      setLoading(false)
    }
  }

  if (theme === "image") {
    return (
      <div>
        <Upload
          theme="image"
          accept={accept ?? "image/*"}
          disabled={loading}
          requestMethod={requestMethod}
          showUploadProgress={false}
          tips={tip}
          files={value ? [{ name: "license", url: value, status: "success" }] : []}
          onRemove={() => onChange?.(undefined)}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Upload
        theme="file"
        accept={accept}
        disabled={loading}
        requestMethod={requestMethod}
        showUploadProgress={false}
        multiple={false}
        autoUpload
      >
        <Button theme="default" variant="outline" loading={loading}>
          选择文件
        </Button>
      </Upload>
      {value ? (
        <a
          className="max-w-60 truncate text-(--td-brand-color)"
          href={value}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          已上传附件
        </a>
      ) : null}
      {value ? (
        <Button
          theme="danger"
          variant="text"
          onClick={() => {
            onChange?.(undefined)
            showMessage("已清除附件", "success")
          }}
        >
          清除
        </Button>
      ) : null}
      {tip ? <span className="w-full text-xs text-(--td-text-color-placeholder)">{tip}</span> : null}
    </div>
  )
}
