'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import { Box, Button, Card, TextField, Radio } from '@mui/material'

import { useContext, useState } from 'react'

import { useForm } from 'react-hook-form'

import { useAppSelector } from '@/redux/reduxHooks'

import CreateQuizContext from '../context'
import { questionSchema, type TQuestionSchema } from '../types'

// import AnswerForm from './AnswerForm/AnswerForm'

import type { SubmitHandler } from 'react-hook-form'

const QuizQuestionForm = (): JSX.Element => {
  const { activeTab } = useContext(CreateQuizContext)

  const activeQuestion = useAppSelector(({ createQuizState }) =>
    createQuizState.questions.find((q) => q.id === activeTab),
  )
  const answers = activeQuestion?.answers

  const [selected, setSelected] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TQuestionSchema>({
    resolver: zodResolver(questionSchema),
  })

  const onSubmit: SubmitHandler<TQuestionSchema> = async (
    data,
  ): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)
    reset()
  }

  return (
    <Card raised className="py-5 px-5 rounded-xl mx-3">
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('question')}
          label="Добавьте текст вопроса"
          type="text"
          placeholder="Пример: Первый астронавт вышедший в открытый космос?"
          fullWidth
          multiline
          error={errors.question !== undefined}
        />
        <p className="mt-0.5 pl-3 text-xs text-red-600 h-4">
          {errors.question !== undefined ? errors.question.message : ''}
        </p>

        {answers?.map((answer, i) => (
          <div key={answer.id}>
            <div className="flex w-full">
              <Radio
                className="mr-1 mt-[-1px]"
                checked={answer.id === selected}
                onClick={() => {
                  setSelected(answer.id)
                }}
              />

              <TextField
                {...register(`answers.${i}`)}
                type="text"
                placeholder="Введите вариант ответа..."
                multiline
                fullWidth
                size="small"
                error={errors.answers?.[i] !== undefined}
              />
            </div>

            <p className="mt-[-1px] mb-2 pl-12 text-xs text-red-600  h-4">
              {errors.answers?.[i] !== undefined
                ? errors.answers?.[i]?.message
                : ''}
            </p>
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <Button variant="text" type="button" startIcon={<AddToPhotosIcon />}>
            Добавить ответ
          </Button>
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            Сохранить вопрос
          </Button>
        </div>
      </Box>
    </Card>
  )
}

export default QuizQuestionForm