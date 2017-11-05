# librail
The core library of toy rail

## 基本データ型
### Rot
レールの座標系の基本となる値で，平面上の点を表す．
同時に，点から点に移す変換とも考えられる．

- このデータ型は足し算の他に掛け算も定義できそう？

### Dir
8方向を意味する．
同時に，方向から方向に移す変換とも考えられる．

### Point
レイアウトの空間における点を意味する．
これも変換としてみることができる．

### Pole
極性．つまり，レールの凹凸を表す．
これも変換として考えられたらスッキリする．

### End
端点．つまり，点と方向と極性を持つ．
そのため，レールの端点を記述する時に使う．

これを変換として表せたら考え方が楽になると思う．

- これも掛け算が定義できるか？正気か？

## 操作

### add: 
群演算として足す．可換であるべき

### flipVert:
平面の垂直方向（南北を）に回転する．そのため，立体的なデータ型は上下も反転する．
名前が悪い．rotateAlongEastWestみたいな感覚なんすよ

### apply: T # M → M 
変換を行う．


## 変換
基本的なデータ型5つは，都合の良いことにすべてある種の変換として捉えることができそう．
これを群作用で考えたい．

方向の変換が点に作用したらくるくる回りそうな気がしませんか？

ただ，同じ群の要素なんだけれども，変換するやつと変換対象を分けて考えて群作用にしたい．


