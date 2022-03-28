import { ABI, ContractAddress } from '@/ABIs/WoodNFT'

import Button from '@mui/material/Button'
import Dialog from '@/components/dialog/Dialog'
import React from 'react'
import { useImmer } from 'use-immer'
import useSelector from '@/hooks/useSelector'

export default function nftShop() {
	const wallet = useSelector((state) => state.walletReducer)
	const [state, setState] = useImmer({
		isModalOpen: false,
		modalTitle: '',
		modalContent: () => {},
	})
	const { isModalOpen, modalTitle, modalContent } = state
	function handleModalClose() {
		setState((draft) => {
			draft.isModalOpen = false
			draft.modalTitle = ''
			draft.modalContent = () => {}
		})
	}
	async function handleMintWoodNFT() {
		const { web3, walletAccount } = wallet
		if (!walletAccount) {
			setState((draft) => {
				draft.isModalOpen = true
				draft.modalTitle = '請先連接你的 Metamask'
			})
			return
		}
		const baseMintCost = '0.0001'
		const woodContract = new web3.eth.Contract(ABI, ContractAddress)
		const amountToSend = web3.utils.toWei(baseMintCost, 'ether') // Convert to wei value
		const receipt = await woodContract.methods
			.mint(walletAccount[0], 1)
			.send({ from: walletAccount[0], value: amountToSend })
		if (receipt.status) {
			setState((draft) => {
				draft.isModalOpen = true
				draft.modalTitle = '恭喜您 Mint 成功'
				draft.modalContent = renderMintSuccessContent
			})
		}
	}

	function renderMintSuccessContent() {
		return (
			<p>
				<span>
					請去 <a>https://testnets.opensea.io/account</a> 看您的 NFT{' '}
				</span>
			</p>
		)
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
			<Dialog title={modalTitle} content={modalContent()} open={isModalOpen} onClose={handleModalClose} />
		</div>
	)
}
