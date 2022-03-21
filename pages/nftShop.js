import { ABI, ContractAddress } from '@/ABIs/WoodNFT'

import Button from '@mui/material/Button'
import React from 'react'
import useSelector from '@/hooks/useSelector'

export default function nftShop() {
	const wallet = useSelector((state) => state.walletReducer)
	async function handleMintWoodNFT() {
		const { web3, walletAccount } = wallet
		if (!walletAccount) {
			alert('請先連接你的 Metamask')
			return
		}
		const baseMintCost = '0.0001'
		const woodContract = new web3.eth.Contract(ABI, ContractAddress)
		const amountToSend = web3.utils.toWei(baseMintCost, 'ether') // Convert to wei value
		const receipt = await woodContract.methods
			.mint(walletAccount[0], 1)
			.send({ from: walletAccount[0], value: amountToSend })
		if (receipt.status) {
			alert('恭喜您 Mint 成功, 請去 https://testnets.opensea.io/account 看您的 NFT')
		}
	}
	return (
		<div>
			<h1>NFT 商店，歡迎來 Mint 各種 NFT </h1>
			<div>
				<h2>商品如下：</h2>
				<ul>
					<li>
						WoodNFT：
						<Button
							style={{ textTransform: 'none' }}
							variant="outlined"
							color="primary"
							onClick={handleMintWoodNFT}
						>
							Mint WoodNFT
						</Button>
					</li>
				</ul>
			</div>
		</div>
	)
}
