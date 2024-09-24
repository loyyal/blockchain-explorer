/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactTable from '../Styled/Table';
import { peerStatusType } from '../types';
import Tooltip from '@mui/material/Tooltip';
import styled from '@emotion/styled';

/* eslint-disable */

const styles = theme => ({
	table: {
		height: 335,
		overflowY: 'scroll'
	},
	center: {
		textAlign: 'left'
	},
	circle: {
		width: '20px',
		height: '20px',
		display: 'inline-block',
		borderRadius: '50%'
	},
	down: {
		backgroundColor: 'red'
	},
	up: {
		backgroundColor: 'green'
	}
});

const Status = styled.span`
	&.blink {
		animation: blink 1s infinite;
	}
	@keyframes blink {
		0% {
			transform: scale(1);
			opacity: 0.1;
		}
		50% {
			transform: scale(1);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 0.1;
		}
	}
`;

/* eslint-enable */

const PeersHealth = ({ peerStatus, classes }) => {
	const statusTooltip = title => {
		return (
			<Tooltip
				title={
					title === 'DOWN'
						? 'Offline'
						: title === 'UP'
						? 'Online'
						: 'Fetching Status'
				}
				placement="top"
			>
				<Status
					className={`${classes.circle} ${
						title === 'DOWN' ? classes.down : classes.up
					} ${!title && 'blink'}`}
				/>
			</Tooltip>
		);
	};
	const columnHeaders = [
		{
			Header: 'Peer Name',
			accessor: 'server_hostname',
			filterAll: false,
			className: classes.center
		},
		{
			Header: 'Status',
			accessor: 'status',
			filterAll: false,
			className: classes.center,
			Cell: row => statusTooltip(row.value)
		}
	];
	console.log(peerStatus, 'peerStatus--------');
	return (
		<div style={{ padding: '15px' }}>
			{/* <ReactTable
				data={peerStatus}
				columns={columnHeaders}
				className={classes.table}
				minRows={0}
				showPagination={false}
			/> */}
			<div style={{ color: '#1E1E1E', fontSize: '22px', fontWeight: 600 }}>
				Peer Name
			</div>
			<div
				style={{
					overflow: 'auto',
					height: '270px',
					marginTop: '10px',
					padding: '0px 0px'
				}}
			>
				{peerStatus.map((item, index) => {
					return (
						<div
							key={item?.mspid}
							style={{
								display: 'flex',
								alignItems: 'center',
								height: '50px',
								backgroundColor: index % 2 === 0 ? '#F5F7F9' : '#ffffff',
								padding: '0px 12px',
								borderRadius: '10px'
							}}
						>
							<div
								style={{
									width: '12px',
									height: '12px',
									borderRadius: '50%',
									backgroundColor: item.status === 'UP' ? 'green' : '#00000080'
								}}
							></div>
							<div style={{ marginLeft: '5%', color: '#1E1E1E', fontSize: '17px' }}>
								{item?.server_hostname}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

PeersHealth.propTypes = {
	peerStatus: peerStatusType.isRequired
};

export default withStyles(styles)(PeersHealth);
