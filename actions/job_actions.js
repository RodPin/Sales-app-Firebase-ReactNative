import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
    FETCH_JOBS
} from './types';
const JOB_ROOT_URL = `https://maps.googleapis.com/maps/api/geocode/json?`;

const JOB_QUERY_PARAMS = {
    publisher:'AIzaSyBN5-2HxjAqtaJACMKphYOD7QIw7_C5pOs',
    format:'json',
    v:'2',
    latlong:1,
    radius: 10,
    q:'javascript'  //aqui o usuario falaria ql o tipo d job q o usuario qr
}

const buildJobsUrl = (zip) => {
    const query = qs.stringify({...JOB_QUERY_PARAMS,l:zip})
    return '${JOB_ROOT_URL}${query}';
}

// export const fetchJobs = (region) =>  async  (dispatch) => {
//     try{
//         let zip = await reverseGeocode(region);
//         const url = buildJobsUrl(zip);
//         let { data } = await axios.get(url);
//         dispatch({type:FETCH_JOBS,payload:data});
//         console.log(data);
//     }catch(e){
//         console.log(e)
//     }
// }

const GITHUB_BASE_URL = 'https://jobs.github.com/positions.json?';
 
export const fetchJobs = ({longitudeDelta, latitudeDelta, longitude, latitude}) => {
 
    return async (dispatch) => {
        try {
            const url = `${GITHUB_BASE_URL}lat=${latitude}&long=${longitude}`;
 
            let {data} = await axios.get(url);
            
            dispatch({
                type: FETCH_JOBS,
                payload: data
            });
            console.log(data);
 
 
        } catch (err) {
            console.log("Something went wrong... ", err);
        }
    }
};
