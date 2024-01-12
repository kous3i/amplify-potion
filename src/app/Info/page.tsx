'use client'

import React from 'react'
import Link from "next/link"
import { swrTest } from '../hooks/swrTest'

export default function () {

  const location = 2
  let flore:number[] = [] 

  for (let loop = 1; loop <= 7; loop++) {
    if (loop != location) {
      flore.push(loop)
    }
  }

  console.log(flore)

  // useSWR(fetch)が必要
  const { data, isError, isLoading } = swrTest();
  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className='ml-24'>
      <p className='flex'>混雑状況</p>
      {/* 一段目 */}
      <div>
        {/* エレベーター */}
        <div>
          <p>エレベーター内</p>
          <p>{data?.data[0]?.person}人</p>
        </div>
        {/* map関数でflore配列の要素数の分だけループさせる */}
        {flore.map((value,index) => (
          <div key={index}>
            <p>{value}F</p>
            <p>{data?.data[value]?.person}人</p>
          </div>
        ))}
      </div>
      <Link href={"/login"} legacyBehavior>
        <a>戻る</a>
      </Link>
    </div>
  )
}
