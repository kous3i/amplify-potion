"use client"

import useSWR from 'swr'

// Jsonからのデータ型定義
// 全階層とエレベーターのipと人数を定義
type Test = {
    data: [
        { ip: string, person: number },
        { ip: string, person: number },
        { ip: string, person: number },
        { ip: string, person: number },
        { ip: string, person: number },
        { ip: string, person: number },
        { ip: string, person: number },
        { ip: string, person: number }
    ];
};

// fetcher関数(データを返す非同期関数)
// key: リクエストのURL
// fetcher関数は、useSWRの第二引数に渡す必要がある
async function fetcher(key: string) {
    return fetch(key).then(res => res.json() as Promise<Test | null>);
}


export const swrTest = () => {
    // useSWRの引数 useSWR(key, fetcher, options)
    // key: リクエストのURL　fetcher: データを返す非同期関数　options: オプション
    // refreshInterval: データを再取得する間隔(ミリ秒)
    const { data, error, isLoading } = useSWR(
        `/testFetch.json`,
        fetcher,
        { refreshInterval: 5000 }
    )

    return {
        data,
        isError: error,
        isLoading
    }
}
