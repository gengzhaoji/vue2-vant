
/**
* 图片压缩
*/
export default function (file) {
    //file是指上传的图片，obj是压缩的品质，越低越模糊
    return new Promise(function (resolve, reject) {
        //大于5M压缩
        if (file.size / 1024 > 0.8 * 1024) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = e => {
                const image = new Image() // 新建一个img标签（还没嵌入DOM节点)
                image.src = e.target.result
                image.onload = () => {
                    const canvas = document.createElement('canvas'),
                        context = canvas.getContext('2d')
                    //设置压缩图片的最大高度
                    var MAX_HEIGHT = 960
                    // 如果高度超标
                    if (image.height > MAX_HEIGHT && image.height >= image.width) {
                        // 宽度等比例缩放 *=
                        image.width *= MAX_HEIGHT / image.height
                        image.height = MAX_HEIGHT
                    }
                    //考录到用户上传的有可能是横屏图片同样过滤下宽度的图片。
                    if (image.width > MAX_HEIGHT && image.width > image.height) {
                        // 宽度等比例缩放 *=
                        image.height *= MAX_HEIGHT / image.width
                        image.width = MAX_HEIGHT
                    }
                    let data = ''
                    let imageWidth = image.width // 压缩后图片的大小
                    let imageHeight = image.height
                    canvas.width = imageWidth
                    canvas.height = imageHeight

                    context.drawImage(image, 0, 0, imageWidth, imageHeight)
                    data = canvas.toDataURL('image/jpeg')
                    let bl = convertBase64UrlToBlob(data)
                    bl['name'] = file.name
                    resolve(bl)
                }
            }
        } else {
            resolve(file)
        }
    })
}

// 将base64码转化为file（Blob）
// 此处函数对压缩后的base64经过处理返回{size: "", type: ""}
function convertBase64UrlToBlob(urlData) {
    var arr = urlData.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}