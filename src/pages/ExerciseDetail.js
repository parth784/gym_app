import React, {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import { exerciseOptions,exerciseOptionsYoutube,fetchData } from '../utils/fetchData'
import Details from '../components/Details'
import { Box } from '@mui/material'
import ExerciseVideos from '../components/ExerciseVideos'
import SimilarExercises from '../components/SimilarExercises'
const ExerciseDetail = () => {
  const [exerciseDetail,setExerciseDetail] = useState({})
  const [exerciseVideos,setExerciseVideos] = useState([])
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const {id} = useParams();
  useEffect(()=>{
    const fetchExercisesData = async ()=>{
        const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com'
        const youtubeSearch = 'https://youtube-search-and-download.p.rapidapi.com'

        const exercisesDataDetails = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
        setExerciseDetail(exercisesDataDetails)
       
        const exerciseVideosData = await fetchData(`${youtubeSearch}/search?query=${exercisesDataDetails.name}exercise`, exerciseOptionsYoutube);
        setExerciseVideos(exerciseVideosData.contents);

        const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exercisesDataDetails.target}`, exerciseOptions);
      setTargetMuscleExercises(targetMuscleExercisesData);

      const equimentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exercisesDataDetails.equipment}`, exerciseOptions);
      setEquipmentExercises(equimentExercisesData);
    }
    fetchExercisesData()
  },[id])
  if (!exerciseDetail) return <div>No Data</div>;
  return (
   <Box>
    <Details exerciseDetail={exerciseDetail}/>
    <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseVideos.name}/>
    <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
   </Box>
  )
}

export default ExerciseDetail
