# template_web_frontend_with_npm-scripts

## 目次

- [概要](#概要)
- [推奨環境](#推奨環境)
- [本テンプレートの使い方](#本テンプレートの使い方)
  - [はじめ方](#はじめ方)
  - [本番ファイルの生成方法](#本番ファイルの生成方法)
- [コーディング規約](#コーディング規約)
- [コマンド](#コマンド)
- [フォルダ構成](#フォルダ構成)
- [Pug](#Pug)
  - [Pugのベースファイル](#Pugのベースファイル)
  - [Pugの変数](#Pugの変数)
- [Scss](#Scss)
  - [CSS設計](#CSS設計)
  - [ベンダープレフィクス](#ベンダープレフィクス)
  - [コンパイル対象のscss](#コンパイル対象のscss)
- [TypeScript](#TypeScript)
  - [コンパイル対象のts](#コンパイル対象のts)
  - [Webpack](#Webpack)
  - [コンパイル&バンドル後のjsのバージョン](#コンパイル&バンドル後のjsのバージョン)
  - [ramda](#[ramda)
- [静的ファイル](#静的ファイル)
- [単体テスト](#単体テスト)
- [cypress導入についての注意点](#cypress導入についての注意点)
- [コードフォーマット](#コードフォーマット)

## 概要

npm scripts のみで構成されたフロントエンド開発用テンプレートです。  
静的サイト開発やフロントエンド上の実験・試作品作成を目的としたテンプレートで、シンプルな構成になっています。  
gulp を利用したい場合は、[template_web_frontend_with_gulp](https://github.com/t-tonyo-maru/template_web_frontend_with_gulp)を使ってください。

主に、以下の技術を使用しています。

- Pug
- Scss（dart sass）
- TypeScript
- Webpack
- Jest

## 推奨環境

|      | バージョン |
| ---- | ---------- |
| node | 16.13.1    |
| yarn | 1.22.17    |
| npm  | 8.3.0      |

## 本テンプレートの使い方

### はじめ方

1. 環境を[推奨環境](#推奨環境)に合わせます。
2. yarn install（もしくは npm install）を実行します。
3. yarn run start（もしくは npm run start）を実行します。
4. ブラウザでローカルサーバーが立ち上がります。  
   a. pug / scss / ts を編集するとホットリロードが走り、ブラウザが更新されます。

### 本番ファイルの生成方法

yarn run build-prod を実行すると、src/ と同階層に dist/ ディレクトリが生成されます。  
その中身が本番用ファイル一式になります。  
（ yarn run build-prod を実行すると、通常の build:\* コマンドではなく、本番ファイル生成用の build-prod:\* コマンドが実行されます。 ）

## コーディング規約

コーディング規約は [template_frontend-document | フロントエンドコーディング規約](https://github.com/t-tonyo-maru/template_frontend-document/blob/main/documents/coding_conventions.md) を参照してください。

## コマンド

本テンプレートで使用できるコマンドは以下の通りです。  
基本的に使用するコマンドは、`start` / `build-prod` のみです。  
（`npm-run-all` を用いて 1 つのコマンドから、複数の npm-script を実行できるようにしています。）  
開発時は `start` 。本番ファイル生成時は `build-prod` を使用します。

| コマンド           | 内容                                                                                                            |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| start              | clean → 各 build → 各 watch を実行します。<br>開発時は基本的にこのコマンドのみで OK です。                      |
| build              | copy → 各 build コマンド を実行します。                                                                         |
| build-prod         | copy → 各 build コマンド を実行し、本番用ファイルを生成します。<br>webpack のみ production-build を実行します。 |
| watch              | 各 watch コマンドを実行します。                                                                                 |
| build:pug          | pug をコンパイルします。                                                                                        |
| watch:pug          | pug を watch しつつ、コンパイルします。                                                                         |
| build:scss         | scss をコンパイルします。                                                                                       |
| watch:scss         | scss を watch しつつ、コンパイルします。                                                                        |
| build:postcss      | postcss を実行します。                                                                                          |
| watch:postcss      | 対象ファイルを watch しつつ、postcss を実行します。                                                             |
| build:webpack      | typescript を webpack 経由でコンパイル・バンドルします。                                                        |
| build-prod:webpack | typescript を webpack 経由かつ production モードで、コンパイル・バンドルします。                                |
| watch:webpack      | ts ファイルを watch しつつ、webpack 経由でコンパイル・バンドルします。                                          |
| copy:static        | src/static/ 配下のファイルを、dist/assets/ 配下にコピーします。                                                 |
| serve              | browser-sync を使って、ブラウザを立ち上げます。                                                                 |
| clean              | dist 配下を削除します。                                                                                         |
| test               | jest を実行します。                                                                                             |
| format             | prettier によるフォーマットを実行します。                                                                       |

## フォルダ構成

```
./
├── .prettierrc … prettier の設定ファイル
├── dist … 生成物が格納されます
├── README.md
├── jest.config.js … jest の設定ファイルです
├── package.json
├── src … 開発用ファイル一式を格納します
│   ├── pug … pug ファイルを格納します
│   │   ├── _base
│   │   ├── _parts
│   │   └── index.pug
│   ├── scss … scss ファイルを格納します（構成は PRECSS です）
│   │   ├── base
│   │   ├── foundation
│   │   ├── helper
│   │   ├── layout
│   │   ├── module
│   │   ├── program
│   │   └── style.scss
│   ├── static … 静的ファイルを格納します
│   │   └── images
│   └── ts … ts ファイルを格納します
│       └── module … エントリーポイント以外のファイルを格納します
├── tsconfig.json … TypeScript のコンパイル設定ファイルです
├── webpack.config.js … webpack 設定ファイルです
└── yarn.lock
```

## Pug

### Pugのベースファイル

Pug のベースファイル（meta タグ、変数ファイル等…）は、src/pug/\_base/に格納しています。  
各ベースファイルは、src/pug/\_base/\_layout.pug に読み込んで展開されるようになっています。  
また、`block append` で展開するようにしているため、各種変数は上書き可能です。

### Pugの変数

Pug で使用する基本的な変数は、src/pug/\_base/\_variables.pug に記載しています。

## Scss

### コンパイル対象のscss

src/scss/ 直下の scss ファイルがコンパイル対象になります。  
これらのファイルはコンパイル後に、dist/assets/css/ に出力されます。

### CSS設計

本テンプレートでは[PRECSS](https://precss.io/ja/)を採用しています。  
scss/ 配下のディレクトリ構成も[PRECSS](https://precss.io/ja/)に準拠したものになっています。

BEM や FLOCSS を使用したい場合は、適宜修正を加えてください。

### ベンダープレフィクス

本テンプレートでは、postcss・autoprefixer を使って、CSS プロパティにベンダープレフィクスが適用されるようにしています。  
対象ブラウザは package.json の browserslist に記載しています。  
適宜カスタマイズしてください。

## TypeScript

### コンパイル対象のts

src/ts/ 直下の ts ファイルがコンパイル対象になります。  
これらのファイルはコンパイル後に、dist/assets/js/ に出力されます。

コンパイル対象の ts ファイルを追加する場合は、以下の作業を行ってください。

1. src/ts/ 直下に ts ファイルを追加する
2. webpack.config.js の entry にファイルを追記する。

### Webpack

本テンプレートでは、Webpack を使って TypeScript のコンパイルおよびバンドルを行っています。  
Webpack は基本的な項目しか設定していません。  
React や Vue 等を導入したい場合は、適宜カスタマイズしてください。

### コンパイル&バンドル後のjsのバージョン

TypeScript のコンパイル&バンドル後の js のバージョンは、package.json の browserslist に記載されている通りです。  
（ webpack.config.js の target で browserslist と指定しているため、package.json の browserslist が適用されます。）

### ramda

本テンプレートでは [ramda](https://ramdajs.com/) を採用しています。  
[ramda](https://ramdajs.com/) は JavaScript / TypeScript のユーティリティライブラリです。  
[R.clone](https://ramdajs.com/docs/#clone) ：ディープコピー、[R.equals](https://ramdajs.com/docs/#equals) ：ディープイコール…などの便利なメソッドが用意されています。  
また、特に JavaScript / TypeScript で関数型プログラミングを実現するのに役立ちます。

`import * as R from 'ramda'` もしくは `import { …必要な機能のみ…, } from 'ramda'` で .ts ファイルに読み込んで使用できます。  
[@types/ramda](https://www.npmjs.com/package/@types/ramda) もインストールしていますので、型安全になっています。

以下に ramda のサンプルファイルを格納しています。

- /src/ts/module/ramdaSample/ramdaSample.ts
- /src/ts/module/ramdaSample/ramdaSample.test.ts

ramda が不要な場合はサンプルファイルを削除した上で、下記のコマンドを実行すれば、テンプレートから削除できます。  
`yarn remove ramda @types/ramda` もしくは `npm uninstall ramda @types/ramda`

## 静的ファイル

本テンプレートでは、静的ファイルは src/static/ 配下に格納してください。  
src/static/ 配下のファイルは copy コマンドによって、dist/assets/ 配下にディレクトリごとコピーされます。

## 単体テスト

本テンプレートでは、jest を導入しています。  
jest の型定義も導入していますので、TypeScript でテストファイルを作成・実行できます。

テストファイルの格納先の指定はありませんが、src/ts/module/paddingZero/ と同じように、処理の本体.ts と同階層に test.ts を格納することをおすすめします。

また、結合テストの仕組みは導入していませんので、必要に応じて導入とカスタマイズをしてください。

## cypress導入についての注意点

e2e テストで cypress を導入する場合、jest の型との競合が発生します。  
この現象は、各 jest ファイル (`**/*.test.ts`) に `import { expect } from '@jest/globals'` を記載することで回避可能です。

[> cypress-io/cypress-and-jest-typescript-example](https://github.com/cypress-io/cypress-and-jest-typescript-example)