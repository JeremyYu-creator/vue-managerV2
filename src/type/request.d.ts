export interface httpResponse<T> {
    /**
     * 状态码，通常0表示成功
     * 可以根据后续的不同类型进行设置
     */
    retcode: number;
    /**
     * 返回主题，可能包含各种类型
     * T 作为一个泛型，指代了各种类型
     */
    object: T;
    /**
     * 返回的文本信息
     * 可以作为错误类型提示的标准文案
     */
    retdesc: string;
    /**
     * 返回时间
     */
    currentTime: string;
}
