/*©mit**************************************************************************
*                                                                              *
* This file is part of FRIEND UNIFYING PLATFORM.                               *
* Copyright 2014-2017 Friend Software Labs AS                                  *
*                                                                              *
* Permission is hereby granted, free of charge, to any person obtaining a copy *
* of this software and associated documentation files (the "Software"), to     *
* deal in the Software without restriction, including without limitation the   *
* rights to use, copy, modify, merge, publish, distribute, sublicense, and/or  *
* sell copies of the Software, and to permit persons to whom the Software is   *
* furnished to do so, subject to the following conditions:                     *
*                                                                              *
* The above copyright notice and this permission notice shall be included in   *
* all copies or substantial portions of the Software.                          *
*                                                                              *
* This program is distributed in the hope that it will be useful,              *
* but WITHOUT ANY WARRANTY; without even the implied warranty of               *
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                 *
* MIT License for more details.                                                *
*                                                                              *
*****************************************************************************©*/

/** @file
 * 
 *  Filesystem manager    definitions
 *
 *  @author PS (Pawel Stefanski)
 *  @date created 23 March 2017
 */

#ifndef __CORE_PID_THREAD_MANAGER_H__
#define __CORE_PID_THREAD_MANAGER_H__

#include <core/types.h>
#include <core/thread.h>
#include <core/nodes.h>
#include "pid_thread.h"
#include <network/http.h>

//
//
//

typedef  struct PIDThreadManager
{
	void                          *ptm_SB;
	PIDThread                *ptm_Threads;
	pthread_mutex_t      ptm_Mutex;
}PIDThreadManager;

//
//
//

PIDThread *PIDThreadNew( void *sb );

//
//
//

void PIDThreadDelete( PIDThread *t );

//
//
//

PIDThreadManager *PIDThreadManagerNew( void *sb );

//
//
//

void PIDThreadManagerDelete( PIDThreadManager *ptm );

//
//
//

int PIDThreadManagerRemoveThreads( PIDThreadManager *ptm );

//
//
//

FUQUAD PIDThreadManagerRunThread( PIDThreadManager *ptm, Http *request, char **url, void *us, void *func );

//
//
//

BufString *PIDThreadManagerGetThreadList( PIDThreadManager *ptm );

//
//
//

int PIDThreadManagerKillPID( PIDThreadManager *ptm, FUQUAD pid );

#endif // __CORE_PID_THREAD_MANAGER_H__
