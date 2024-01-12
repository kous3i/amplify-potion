'use client'
import React from 'react'
import Image from "next/image"
import { swrTest } from '../hooks/swrTest'
import { useState } from 'react'

export const Sidenav = () => {

  // 現在の階層(useStateじゃなくていいかも)
  const [location, setLocation] = useState(2)
  // 画面左側の画像
  // 全階層
  const flore = 4
  // useStateだと無限ループになる？(レンダリング → 画像切り替え → レンダリング → 画像切り替え → ...)
  let up = "/up-yes_new.png"
  let down = "/down-no_new.png"
  // 上層と下層の人数
  let upper = 0
  let lower = 0

  // ポーリング(定期的にfetchする)が必要  実装済み
  const { data, isError, isLoading } = swrTest();
  if (isError) return <div>failed to load</div>;
  if (isLoading) return<div>now loading</div>;

  // 下層と上層の人数を計算
  for (let loop = 1; loop <= flore; loop++) {
    if (loop < location) {
      // 下層
      lower = lower + (data?.data[loop]?.person ?? 0);
    } else if (loop > location) {
      // 上層
      upper = upper + (data?.data[loop]?.person ?? 0);
    } else {
      // 同じ階層は計算しない
    }
  }
  // console.log(lower)
  // console.log(upper)

  // 画像の設定(エレベーターの定員を6人と仮定する)
  // 下への移動の判断
  if (upper >= 6) {
    down = "/down-no_new.png"
  } else {
    down = "/down-yes_new.png"
  }

  // // 上への移動の判断
  if (lower >= 6) {
    up = "/up-no_new.png"
  } else {
    up = "/up-yes_new.png"
  }

  return (
    <div className=''>
      <div className=''>
        <Image src={up} width={500} height={280} alt={'up-yes_new.png'}></Image>
        <Image src={down} width={500} height={280} alt={'down-no_new.png'}></Image>
      </div>
    </div>
  )
}

export default Sidenav