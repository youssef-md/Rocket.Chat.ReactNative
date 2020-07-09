import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import I18n from '../../i18n';
import { CustomIcon } from '../../lib/Icons';
import RocketChat from '../../lib/rocketchat';
import { themes } from '../../constants/colors';
import { withTheme } from '../../theme';
import { isAndroid, isTablet } from '../../utils/deviceInfo';
import sharedStyles from '../Styles';

const androidMarginLeft = isTablet ? 0 : 4;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginRight: isAndroid ? 15 : 5,
		marginLeft: isAndroid ? androidMarginLeft : -10,
		justifyContent: 'center'
	},
	inner: {
		alignItems: 'center',
		flexDirection: 'row',
		flex: 1
	},
	text: {
		fontSize: 16,
		...sharedStyles.textRegular,
		marginRight: 4
	},
	name: {
		...sharedStyles.textSemibold
	}
});

const Header = React.memo(({ room, thread, theme }) => {
	let type;
	if (thread?.id) {
		type = 'thread';
	} else if (room?.prid) {
		type = 'discussion';
	} else {
		type = room?.t;
	}
	let icon;
	if (type === 'discussion') {
		icon = 'chat';
	} else if (type === 'thread') {
		icon = 'threads';
	} else if (type === 'c') {
		icon = 'hash';
	} else if (type === 'l') {
		icon = 'livechat';
	} else if (type === 'd') {
		if (RocketChat.isGroupChat(room)) {
			icon = 'team';
		} else {
			icon = 'at';
		}
	} else {
		icon = 'lock';
	}

	const textColor = themes[theme].previewTintColor;

	return (
		<View style={styles.container}>
			<View style={styles.inner}>
				<Text numberOfLines={1} style={styles.text}>
					<Text style={[styles.text, { color: textColor }]} numberOfLines={1}>{I18n.t('Sending_to')} </Text>
					<CustomIcon
						name={icon}
						size={16}
						color={textColor}
					/>
					<Text
						style={[styles.name, { color: textColor }]}
						numberOfLines={1}
					>
						{thread?.msg ?? RocketChat.getRoomTitle(room)}
					</Text>
				</Text>
			</View>
		</View>
	);
});
Header.propTypes = {
	room: PropTypes.object,
	thread: PropTypes.object,
	theme: PropTypes.string
};

export default withTheme(Header);
