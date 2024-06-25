import { Form, useLoaderData, useSubmit } from 'react-router-dom'
import styles from './styles.module.scss'
import { useState } from 'react'

export const Setting = () => {
    // const config = useLoaderData() as ConfigDataType
    const [keys, setKeys] = useState<string[]>([])
    const {config} = useLoaderData() as {
        config: ConfigDataType
    }
    const submit = useSubmit()
    return (
        <Form method="POST">
            <main className={styles.settingPage}>
                <h1>Setting</h1>
                <section>
                    <h5>快捷键定义</h5>
                    <input
                        type="text"
                        name="shortCut"
                        defaultValue={config.shortCut}
                        readOnly
                        onKeyDown={(e) => {
                            if (e.metaKey || e.ctrlKey || e.altKey) {
                                const code = e.code.replace(/Left|Right|Key|Digit/, '')
                                if (keys.includes(code)) return
                                keys.push(code)
                                setKeys(keys)
                                // 如果以数字或字母或者空格结尾
                                if (code.match(/^(\w|\s)$/gi)) {
                                    e.currentTarget.value = keys.join('+')
                                    setKeys([])
                                    submit(e.currentTarget.value)
                                    // 注册快捷键
                                    window.api.shortCut()
                                }
                            }

                        }}
                    />
                </section>
                <section>
                    <h5>大模型配置信息</h5>
                    <input 
                      type="text" 
                      name="LLM" 
                      defaultValue={JSON.stringify(config.llm)}
                      onChange={(e)=>{
                        submit(e.currentTarget.value)
                      }}
                      />
                </section>
            </main>
        </Form>
    )
}