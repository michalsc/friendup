/*©agpl*************************************************************************
*                                                                              *
* This file is part of FRIEND UNIFYING PLATFORM.                               *
*                                                                              *
* This program is free software: you can redistribute it and/or modify         *
* it under the terms of the GNU Affero General Public License as published by  *
* the Free Software Foundation, either version 3 of the License, or            *
* (at your option) any later version.                                          *
*                                                                              *
* This program is distributed in the hope that it will be useful,              *
* but WITHOUT ANY WARRANTY; without even the implied warranty of               *
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                 *
* GNU Affero General Public License for more details.                          *
*                                                                              *
* You should have received a copy of the GNU Affero General Public License     *
* along with this program.  If not, see <http://www.gnu.org/licenses/>.        *
*                                                                              *
*****************************************************************************©*/

document.title = 'Dock gui.';

var currentDock = 0;

Application.run = function( msg, iface )
{
	//console.log( 'We ran.' );
}

Application.receiveMessage = function( msg )
{
	//console.log( 'We are receiving:', msg );
	if( !msg.command )
		return;

	//console.log( 'We passed on command..' );

	switch( msg.command )
	{
		case 'updateitem':
			ge( 'Application' ).value = msg.item.Application;
			ge( 'ShortDescription' ).value = msg.item.ShortDescription;
			ge( 'Icon' ).value = typeof( msg.item.Icon ) != 'undefined' ? msg.item.Icon : '';
			ge( 'Settings' ).classList.remove( 'Disabled' );
			break;
		case 'refreshapps':
			ge( 'Applications' ).innerHTML = msg.data;
			break;
		case 'setdocks':
			console.log('setdocks received....',msg);
			if( msg.docks == false )
			{
				ge( 'Docks' ).innerHTML = '<option value="0">' + i18n( 'i18n_standard_dock' ) + '</option>'; 
				var html = '<option value="left_top">' + i18n('i18n_left_top') + '</option>';
				html += '<option value="left_center">' + i18n('i18n_left_center') + '</option>';
				html += '<option value="left_bottom">' + i18n('i18n_left_bottom') + '</option>';
				html += '<option value="right_top">' + i18n('i18n_right_top') + '</option>';
				html += '<option value="right_center" selected="selected">' + i18n('i18n_right_center') + '</option>';
				html += '<option value="right_bottom">' + i18n('i18n_right_bottom') + '</option>';
				html += '<option value="top_left">' + i18n('i18n_top_left') + '</option>';
				html += '<option value="top_center">' + i18n('i18n_top_center') + '</option>';
				html += '<option value="top_right">' + i18n('i18n_top_right') + '</option>';
				html += '<option value="bottom_left">' + i18n('i18n_bottom_left') + '</option>';
				html += '<option value="bottom_center">' + i18n('i18n_bottom_center') + '</option>';
				html += '<option value="bottom_right">' + i18n('i18n_bottom_right') + '</option>';
				ge( 'DockLayout' ).innerHTML = html;
				html = '<option value="aligned" selected="selected">' + i18n('i18n_aligned') + '</option>';
				html += '<option value="fixed">' + i18n('i18n_fixed') + '</option>';
				ge( 'DockPlacement' ).innerHTML = html;
				// Just set this to an irrelevant one
				ge( 'DockY' ).value = 0;
				ge( 'DockX' ).value = 0;
				html = '<option value="80">' + i18n('i18n_extra_large') + '</option>';
				html += '<option value="59" selected="selected">' + i18n('i18n_large') + '</option>';
				html += '<option value="32">' + i18n('i18n_medium') + '</option>';
				html += '<option value="16">' + i18n('i18n_small') + '</option>';
				ge( 'DockSize' ).innerHTML = html;
			}
			LoadDock();
			break;
	}
}

function getSelectValue( sel )
{
	var opts = sel.getElementsByTagName( 'option' );
	for( var a = 0; a < opts.length; a++ )
	{
		if( opts[a].selected )
			return opts[a].value;
	}
	return false;
}

function setSelectValue( sel, val )
{
	var opts = sel.getElementsByTagName( 'option' );
	for( var a = 0; a < opts.length; a++ )
	{
		if( opts[a].value == val )
		{
			opts[a].selected = 'selected';
			return true;
		}
	}
	return false;
}

function LoadDock( callback )
{
	console.log('load em dockk ');

	var m = new Module( 'dock' );
	m.onExecuted = function( e, d )
	{
		console.log('dock loaded...',e,d);
		if( e == 'ok' )
		{
			var dd = false;
			try {
				dd = JSON.parse( d );
			} catch( e ) { console.log('no dock settings saved'); }
			
			if(dd)
			{
				setSelectValue( ge( 'DockPlacement' ), dd.options.position );
				setSelectValue( ge( 'DockLayout' )   , dd.options.layout   );
				setSelectValue( ge( 'DockSize' )     , dd.options.size     );
				ge( 'DockY' ).value = dd.options.dockx;
				ge( 'DockX' ).value = dd.options.docky;				
			}
		}
	}
	m.execute( 'getdock', { dockid: currentDock } );
}

function SaveCurrentDock()
{
	var options = {};
	options.position = getSelectValue( ge( 'DockPlacement' ) );
	options.layout   = getSelectValue( ge( 'DockLayout' ) );
	options.size     = parseInt( getSelectValue( ge( 'DockSize' ) ) );
	options.dockx    = ge( 'DockY' ).value;
	options.docky    = ge( 'DockX' ).value;
	Application.sendMessage( { 
		command: 'savecurrentdock', 
		dockid: currentDock, 
		options: options
	} );
}


