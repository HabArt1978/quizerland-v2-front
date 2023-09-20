import EditNoteIcon from '@mui/icons-material/EditNote'
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl'
import InputOutlinedIcon from '@mui/icons-material/InputOutlined'
import { Divider } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { usePathname, useRouter } from 'next/navigation'

import type { ILink } from './link.interface'

const LinksList = (): JSX.Element => {
	const pathname = usePathname()
	const router = useRouter()

	const links: ILink[] = [
		{
			pathname: '/',
			query: { name: 'Тесты' },
			muiIcon: <FormatListNumberedRtlIcon />,
		},
		{
			pathname: '/create-quiz',
			query: { name: 'Создание тестов' },
			muiIcon: <EditNoteIcon />,
		},
		{
			pathname: '/auth',
			query: { name: 'Авторизация' },
			muiIcon: <InputOutlinedIcon />,
		},
	]

	return (
		<>
			{links.map((link, idx) => {
				const isActive = pathname === link.pathname

				return (
					<>
						<ListItem
							key={`${link.query.name}${idx}`}
							onClick={() => {
								router.push(link.pathname)
							}}
						>
							<ListItemButton>
								<ListItemIcon className="my-auto">{link.muiIcon}</ListItemIcon>
								<ListItemText className="my-auto" primary={link.query.name} />
							</ListItemButton>
						</ListItem>

						{link.query.name === 'Создание тестов' && (
							<Divider className="w-64 mx-auto my-2" />
						)}
					</>
				)
			})}
		</>
	)
}

export default LinksList
