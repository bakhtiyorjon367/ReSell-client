import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="robots" content="index,follow" />
				<link rel="icon" type="image/png" href="/img/logo/favicon.svg" />

				{/* SEO */}
				<meta name="keyword" content={'resell, resell.uz, ReSell , RESELL nestjs '} />
				<meta
					name={'description'}
					content={
						'Buy and sell products anywhere anytime in neighbourhood. We are changing classifield for the better. Welcome to your new neighbourhood market. | ' +
						'Покупайте и продавайте продукты где угодно и когда угодно в районе. Мы меняем classifield к лучшему. Добро пожаловать на ваш новый рынок района. | ' +
						'동네에서 언제 어디서나 제품을 사고 팔 수 있습니다. 우리는 classifield를 더 나은 방향으로 바꾸고 있습니다. 새로운 동네 시장에 오신 것을 환영합니다.'
					}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
